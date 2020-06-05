import React from 'react';
import { PortalWithState } from 'react-portal';
import { useHistory } from 'react-router-dom';

import { MdClose } from 'react-icons/md';
import { Overlay } from '../../../styleComponents/ui/overlay.style';
import { Box } from '../../../styleComponents/ui/box.style';

import {MdDeleteForever} from 'react-icons/md';
import { DivInfo } from './deleteSeriesModal.style';






const DeleteSeriesModal = (props:any) => {
  
  const history = useHistory();

  const handleDeleteSeries = () => {
    console.log("close")
    history.push('/');
    history.goBack()
  }
  
  return (
    
    <PortalWithState 
      closeOnOutsideClick 
      closeOnEsc
      onClose={handleDeleteSeries}>
      {({ openPortal, closePortal, portal }) => (
        
        <React.Fragment>
          <MdDeleteForever onClick={openPortal} />
      
          {portal(
            <>    
              <Overlay globalModal zIndex={"999"}  onClick={closePortal}>
                
              </Overlay>
              <DivInfo>
                <MdClose 
                onClick={closePortal}
                color={"black"}
                fontSize={"3rem"}
                />
  
                <Box 
                  secondaryTalkBubble
                  fontSize={"2.4rem"}
                  lineHeight={"3rem"}
                  bottom={"-27%"}>
                  <p>Are you sure you want to continue deleting this series? <span  onClick={closePortal}>Delete</span></p>
                </Box>

              </DivInfo>
            </>
          
          )}
        </React.Fragment>
      )}
    </PortalWithState>
 
  );
};

export default DeleteSeriesModal;
