import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

interface AvatarProps {
  image: string;
  name: string;
  lastname: string;
  home?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ image, name, lastname, home }) => {
  return (
    <div className="avatar">
      <img src={image} alt={`${name} ${lastname}`} />

      {home ? (
        <Link to="/user">{`${name} ${lastname}`}</Link>
      ) : (
        <strong>{`${name} ${lastname}`}</strong>
      )}
    </div>
  );
};

export default Avatar;
