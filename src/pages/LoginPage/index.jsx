import React,{useState} from 'react'
import axios from "axios"

export const LoginPage = () => {
  const [holidayId, setHolidayId] = useState("");
  
  function downloadPDF(pdf, fileName) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    //const fileName = "vct_illustration.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("result", {holidayId});
    const endpoint = "https://l8kgcely70.execute-api.us-west-2.amazonaws.com/dev/app-pdf-conf-holiday-dev";
    try {
      const response = await axios.get(endpoint+`?holiday_id=${holidayId}`
      /*, {
        params: {
          holiday_id: {holidayId}
        }
      }
      */
     );
      console.log(response.data);
      downloadPDF(response.data, `holiday_confirmation_${holidayId}.pdf`);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="holiday id">Holiday ID</label>
        <input type="number" 
          name="holidayId" 
          id="holidayId" 
          value={holidayId} 
          onChange={(e)=> setHolidayId(e.target.value)}
        />
        <button type="submit">Download Confirmation</button>
      </form>
    </div>
  )
}
