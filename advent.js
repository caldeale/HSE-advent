   let daysOpened = [];

let icons = [
    '&#x1F6F7;',
    '&#x1F328;',
    '&#x1F43B;',
    '&#x1F332;',
    '&#x1F381;',
    '&#x1F936;',
    '&#x1F9E4;',
    '&#x1F9E3;',
    '&#x1F976;',
    '&#x1F31F;',
    '&#x26F8;',
    '&#x1F36A;',
    '&#x1F98C;',
    '&#x1F3C2;',
    '&#x26F7;',
    '&#x1F3BF;',
    '&#x1F3D2;',
    '&#x1F514;',
    '&#x1F6CF;',
    '&#x1F385;',
    '&#x1F3BF;',
    '&#x1F56F;',
    '&#x26c4;'
  ];

icons = randomizeIcons(icons);
const boxes = document.querySelectorAll('.num');


if(daysOpened !== null){
  showClickedBoxes
}

function handleBoxClick(event){
  const boxClicked = event.currentTarget;
  const dayClicked = boxClicked.dataset.day;
  const today = new Date();
  if(today.getDate() >= Number(dayClicked)){
    console.log('Yes you can open me.');
    boxClicked.innerHTML = icons[Number(dayClicked)];

    storeClickedBoxes(dayClicked);

  }else{
    console.log('NO Peaking!!! This box can NOT be opened!!');
  }
  console.log(today.getDate(), Number(dayClicked));
}

boxes.forEach(function (box){
  box.addEventListener('click', handleBoxClick);
});

function storeClickedBoxes(day){
  if(!localStorage.getItem('daysClicked')){
    daysOpened = [];
  }else{
    daysOpened = JSON.parse(localStorage.getItem('daysClicked'));
  }
  if(!daysOpened.includes(day)){
  daysOpened.push(day);
  }
  localStorage.setItem('daysClicked', JSON.stringify(daysOpened));
  console.log(daysOpened);

}
function randomizeIcons(oldList){
  let randomList = [];
  if(!localStorage.getItem('icons')){
    while(oldList.length > 0){
      const index = Math.floor(Math.random()*oldList.length);
      randomList.push(oldList[index]);
      oldList.splice(index,1);
    }
    localStorage.setItem('icons',JSON.stringify(randomList));
  } else {
    randomList = JSON.parse(localStorage.getItem('icons'));
  }
  return randomList;

}

function showClickedBoxes(){
  if(daysOpened !== null){
    boxes.forEach(function (box){
      const day = Number(box.dataset.day);
      if(daysOpened.includes(day)){
        box.innerHTML = icons[day];
      }
    });
  }
}

function resetCalendar(){
  const answer = confirm('Are you sure you want to reset the calendar? This action cannot be undone.');
  localStorage.clear();
  document.location.reload();
  if(answer){
    localStorage.clear();
    document.location.reload();
  }
}


const resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset Calendar';
resetButton.addEventListener('click', resetCalendar);

const footer = document.querySelector('footer');
footer.insertAdjacentElement('afterbegin',resetButton);
footer.style.textAlign = 'center';
footer.style.paddingtop = '20px';
