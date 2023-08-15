import React from 'react';

interface CardProps {
  user: {
    index: number;
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
  };
  country: string;
}

const Card: React.FC<CardProps> = ({ user, country }) => {
  const fullName = country === 'USA' ? `${user.firstName} ${user.middleName} ${user.lastName}` : `${user.firstName} ${user.lastName}`;

  return (
    <div className="card mb-3" style={{ width: "18rem", float: 'left', margin: '1%' }}>
      <div className="card-body">
        <h5 className="card-title">{fullName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{user.id}</h6>
        <p className="card-text">{user.address}</p>
        <p className="card-text"><small className="text-muted">{user.phoneNumber}</small></p>
      </div>
    </div>
  );
}

export default Card;
