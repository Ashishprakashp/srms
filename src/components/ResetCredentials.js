import { React } from 'react';
import axios from 'axios';

export default function ResetCredentials() {

    // Handle reset password functionality
    const handleReset = async (e) => {
        e.preventDefault();
        
        const facultyId = sessionStorage.getItem("facultyId");
        const pwd1 = e.target.pwd1.value;
        const pwd2 = e.target.pwd2.value;
    
        if (pwd1 !== pwd2) {
            alert("Passwords do not match!");
            return;
        }
    
        if (!facultyId) {
            alert("No faculty selected for password reset.");
            return;
        }
        
        console.log(facultyId, pwd1);
        
        try {
            const response = await axios.put("http://localhost:5000/faculty/resetPasswordOnce", {
                facultyId: facultyId,
                newPassword: pwd1,
                reset:1 
            });
            alert("Password reset successfully!");
        } catch (error) {
            console.error("Error resetting password:", error);
            alert("Error resetting password.");
        }
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        try {
            console.log("Cancel clicked");
            // Simulate an async action
            setTimeout(() => {
                console.log("Action canceled");
            }, 500);
        } catch (error) {
            console.error("Error handling cancel:", error);
        }
    };

    return (
        <div className="fa-reset-pw">
          <h2>Reset Password</h2>
          <form onSubmit={handleReset}>
            <input type="password" name="pwd1" className="field" placeholder="Enter password" required />
            <input type="password" name="pwd2" className="field" placeholder="Confirm password" required />
            <div className="reset-credentials-container">
              <button type="submit">Reset Password</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
    );
}
