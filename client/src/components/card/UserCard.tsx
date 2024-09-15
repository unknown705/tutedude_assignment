import { CgProfile } from "react-icons/cg";

interface UserCardProps {
  username: string;
  hobbies: string[];
}

const UserCard = ({ username, hobbies }: UserCardProps) => {
  return (
    <div className="flex flex-col max-w-80">
      <div>
        <CgProfile />
      </div>
      <div className="flex flex-col">
        <h1>{username}</h1>
        <div className="flex flex-wrap gap-2">
          {hobbies.map((hobby) => (
            <span key={hobby} className="bg-gray-300 p-1 rounded">
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
