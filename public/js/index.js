

const form = document.getElementById('mainform');
const jobtitle = document.getElementById('jobtitle');
const count = document.getElementById('count');
const textArea = document.getElementById('results');

form.addEventListener('click', async (e) => {
  if (e.target.type === 'submit') {
    e.preventDefault();
    const response = await fetch('/scrap/', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({jobtitle:jobtitle.value, count: count.value}),
    });

    if (response.ok){
      const result = await response.json();
      //console.log(result);
      let {skillsArr} = result;
      
      console.log(skillsArr);
      skillsArr.sort((a, b)=>b.count - a.count);
      for (let i = 0; i < skillsArr.length; i++){
        const line = skillsArr[i].name + '  :  ' + skillsArr[i].count + '\n';
        textArea.insertAdjacentText('beforeend', line);
      }

      
    } else {
      console.log('Error launching scrapper');
    }

  }

});
