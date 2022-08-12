
import styles from 'D:/medicine/src/asset/css/verifydoctor.module.css';
import thank from 'D:/medicine/src/asset/images/thank.webp';
function VerifyDoctor() {
 
  

  return (
    <div className={styles.verifydoctor}>
      <img src={thank} alt="Thank"></img>
      <p>Your Docotorate Registration Number has reached to us. We will email you in 1hr. You can then login with the username and password, you have used to create the account!</p>
    </div>
  );
};
export default VerifyDoctor;