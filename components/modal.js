import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Modal = ({show, children, onDissmiss})=>{
    return (
      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onDissmiss}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900 bg-opacity-90 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel onClick={(e)=>e.stopPropagation()} className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
}
export default Modal;

/* <div onClick={()=>onDissmiss()} className={`relative z-10 ${!show && 'hidden'}`} role="dialog">

<div className={`fixed inset-0 bg-black bg-opacity-20 transition-opacity`}></div>

  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <div onClick={(e)=>e.stopPropagation()} className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            {children}
        </div>  
    </div>
  </div>
</div>
</div> */