import React from "react";
import swal from "sweetalert";

function Birthday({ data }) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const userBday = data.filter((x, z) => {
    return x.date === formattedDate;
  });
  return (
    <>
      {setTimeout(() => {
        if (userBday.length > 0) {
          userBday.map((item) => {
            alert(`happy birtday ${item.name}`);
            //     swal({
            //       title: `Happy Birthday, ${item.name}! 🎉🎂`,
            //       text: "Wishing you all the best on your special day!",
            //       icon: "success",
            //       button: "Thank you!",
            //     });
          });
        }
      }, 3000)}
    </>
  );
}

export default Birthday;
