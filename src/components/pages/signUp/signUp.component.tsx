import React, { useState, useEffect} from 'react';
import { Input, InputField, Label } from '../../../styleComponents/ui/input.style';
import { Form, Div, Container } from './signUp.style';
import { TitleSection } from '../../../styleComponents/ui/title.syle';
import Button from '../../../styleComponents/ui/button.style';
import loginImage from '../../../images/loginImage.png'
import { LinkRouter } from '../../../styleComponents/ui/link.style';
import {signUp} from '../../../services/signUp';
import { isMail, isLengthCorrect, isRequired } from '../../../utility/validator';
import { Box } from '../../../styleComponents/ui/box.style';
import { useHistory, useLocation } from 'react-router-dom';
import { getProfile,postInitProfile } from '../../../services/profile';




const SignUp = (props:any) => {

  let {
    setUserProfile,
    setAlert,
    alert,
    setRegistration,
    removeAlert} = props;
 
  const history = useHistory();
  const location = useLocation();
  const continueToPublish = location.state;

  let [email,setEmail] = useState<string>("");
  let [password,setPassword] = useState<string>("");
  const [showForm, setshowForm] = useState<boolean>(false);


  useEffect(() => {  
    removeAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  const handleSendData = async (e:any) => {
    e.preventDefault();
    e.persist();
    
    if(!isRequired(email)&&!isRequired(password)){
      console.log("WORKING")
      setAlert("Please insert Email and Password", "danger");
    } else if (!isLengthCorrect(password)) {
      setAlert("Password must be at least 8 characters", "danger");
    } else if(!isMail(email)){
      setAlert("Please insert a correct Email", "danger");
    } else {
      const data = {email, password};
      signUp(data)
        .then(res => {
          if(res){   
            setRegistration(res);
            postInitProfile(res.token,email)
            // getProfile(res.token)
              .then( res => {
                console.log("GET PROFILE RESPONSE",res);
                setUserProfile(res);
              });
              if(continueToPublish){
                history.push('/publish-creator-info');
              }else{
                history.push("./thankyoupage");
              }

          } else {
            history.push("./errorpage");
          } 
      })   
    }
  }

  const handleToggleLogin = () => {
    setshowForm(!showForm)
  };

  return (
    <Container> 
      <Div main>
        {alert.length > 0 ?  
          <Box errorTalkBubble>{alert[0].msg}</Box> : null       
        } 
        <Form>
          <TitleSection>Sign up</TitleSection>
          <Div loginOptions>
            <p>Already have a Guhit account?<span>
            <LinkRouter primary to="./login">Log in.</LinkRouter></span></p>
          </Div>
          <>
            <Input>
              <InputField 
                type="text"
                required 
                onChange={(e) => setEmail(e.target.value)}
                />
              <Label>Email</Label>
            </Input>
            <Input>
              <InputField 
                type="password"
                required 
                onChange={(e) => setPassword(e.target.value)}/>
              <Label>Password</Label>
            </Input>
            <Button 
              secondary 
              onClick={handleSendData}>
              Sign up
            </Button>
            <Div loginOptions>
              <p>By signing up you agree to our<span onClick={handleToggleLogin}>Terms of use.</span></p>
            </Div>
          </>
        </Form>
      </Div>

      <img src={loginImage} alt="footer" />
    </Container>
  );
};

export default SignUp;

