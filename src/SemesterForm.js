import {React} from 'react';

export default function SemesterForm(){
   
    return(
        <div>
            <div className="container">
              <AdminTitleBar title={"IST Student Records Management"} />
          
              {/* Main Content */}
              <div className="main-content">
                <div className="card-container">
                  {services.map((service, index) => (
                    <div key={index} className="card" onClick={() => handleServiceClick(service.title)}>
                      <img src={service.image} alt={service.title} className="card-image" />
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
          
              
            </div>
            {/* Show password reset form only if password is not reset */}
            {!isPasswordReset && (
              <ResetCredentials/>
            )}
            </div>
    );
}