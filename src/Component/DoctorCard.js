import React from 'react';
import Doctors from './Doctor/Doctors';

function DoctorCard({doc})
{

return(
    <div>
      { doc.map((e)=>{
            return <Doctors doctor={e}/>}
      )}
    </div>
)
}

export default DoctorCard;