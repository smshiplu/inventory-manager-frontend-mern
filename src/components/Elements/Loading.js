import { CgSpinner } from "react-icons/cg";

export const Loading = () => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-900 bg-opacity-60 z-50 flex items-center justify-center ">
      <button type="button" className="bg-indigo-0 text-white" disabled>
        <CgSpinner className="inline animate-spin h-5 w-5 mr-3"/>
        Processing...
      </button>
    </div>
  )
}
