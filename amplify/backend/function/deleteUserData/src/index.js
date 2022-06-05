const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tables = ['Post-huwqfqytmvcurlk5le7ajzglvi-dev', 'Comment-huwqfqytmvcurlk5le7ajzglvi-dev']

exports.handler = async (event) => {
    console.log(event)
    const ownerField = 'owner'; // owner is default value but if you specified ownerField on auth rule, that must be specified here
    const identityClaim = 'username'; // username is default value but if you specified identityField on auth rule, that must be specified here
    var condition = {}
    condition[ownerField] = {
        ComparisonOperator: 'EQ'
    }
    
    condition[ownerField]['AttributeValueList'] = [event.identity.claims[identityClaim]];

    await new Promise(async (res) => {
        let LastEvaluatedKey;
        tables.forEach(async (tableName) => {
            do {
                let scanParams = {
                    TableName: tableName,
                    ScanFilter: condition,
                    AttributesToGet: ['id', ownerField],
                    ExclusiveStartKey: LastEvaluatedKey
                }
                
                console.log(scanParams)
    
                const items = await new Promise(resolve => {
                    dynamodb.scan(scanParams, (err, data) => {
                        if (err) {
                            console.log({ error: 'Could not load items: ' + err });
                            resolve([]);
                        } else {
                            console.log(data)
                            LastEvaluatedKey = data.LastEvaluatedKey;
                            resolve(data.Items);
                        }
                    });
                })
                console.log('llego')
    
                if (items.length > 0) {
                    console.log(`records to be deleted: ${items.length}`);
                    let deleteParams = {
                        RequestItems: {
                            [tableName]: items.map(item => {
                                return {
                                    DeleteRequest: {
                                        Key: { id: item.id }
                                    }
                                }
                            })
                        }
                    }
        
                    await new Promise(resolve => {
                        dynamodb.batchWrite(deleteParams, (err, data) => {
                            resolve();
                        })
                    })
                }
    
            } while(LastEvaluatedKey)
        });
        
        
        res();
    });

    

    return true; // this means the user data was cleaned up
};