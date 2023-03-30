import { AiOutlineClose, AiOutlineInfoCircle } from 'react-icons/ai'
import Button from '../Button'

type MensajeConfirmacionProps = {
  accept: () => void
  closeModal: () => void
  message: string
}

const MensajeConfirmacion = ({
  closeModal,
  accept,
  message,
}: MensajeConfirmacionProps) => {
  return (
    <div className='fixed inset-0 top-0 left-0 right-0 z-50 h-full p-4 overflow-x-hidden overflow-y-auto '>
      <div className='relative w-full h-auto max-w-md m-auto translate-y-1/2'>
        <div className='relative bg-[#1b2b44] rounded-lg shadow'>
          <button
            type='button'
            className='absolute top-3 right-2.5 '
            onClick={closeModal}
          >
            <AiOutlineClose className='w-5 h-5 font-bold text-white hover:text-gray-400' />
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-6 text-center'>
            <AiOutlineInfoCircle className='w-20 h-20 mx-auto text-gray-300' />
            <h3 className='my-4 text-lg font-medium text-gray-300 '>
              {message}
            </h3>
            <button
              type='button'
              onClick={accept}
              className='px-5 py-2.5 text-white rounded-lg bg-red-700 hover:bg-red-800 mr-4 border border-red-900'
            >
              Aceptar
            </button>
            <Button padding='px-5 py-2.5' onClick={closeModal}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MensajeConfirmacion
