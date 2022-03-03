let count = 1;
let fin = 0;

function spin() {
  let wheel = document.querySelector(".wheel");
  let ret = undefined;
  switch (count) {
    case 1:
      wheel.classList.add("spinAround");
      ret = new Promise((res) => {
        setTimeout(res, 7000);
      });
      break; 
    case 2:
      wheel.classList.add("spinAround2");
      ret = new Promise((res) => {
        setTimeout(res, 7000);
      });
      break;
    case 3:
      wheel.classList.add("spinAround3");
      ret = new Promise((res) => {
        setTimeout(res, 7000);
      });
    break;  
    case 4:
        wheel.classList.add("spinAround4");
        ret = new Promise((res) => {
          setTimeout(res, 7000);
        });
      break; 
    case 5:
      wheel.classList.add("spinAround5");
      ret = new Promise((res) => {
        setTimeout(res, 7000);
      });
    break;    
    default:
      wheel.classList.add("spinAround6");
      ret = new Promise((res) => {
        setTimeout(res, 7000);
      });
      break;
  }
  count++;
  return ret;
}