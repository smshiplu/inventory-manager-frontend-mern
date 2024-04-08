
import PlaceholderImg from "../../../assets/user-placeholder.jpg";

export const UserInfo = ({user}) => {
  const {name, email, phone, bio, photo} = user;
  return (
    <div className="flex flex-col items-center pb-10">
      <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${user.photo ? photo : PlaceholderImg}`} alt={name} />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white capitalize">{name}</h5>
      <div className="flex flex-col items-center justify-center px-4">
        <p>
          <span className="font-semibold text-sm">Email : </span><span className=" text-gray-500 dark:text-gray-400 text-sm">{email}</span>
        </p>
        <p>
          <span className="font-semibold text-sm">Phone : </span><span className=" text-gray-500 dark:text-gray-400 text-sm">{phone}</span>
        </p>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">{bio}</p>
      </div>
    </div>
  )
}
