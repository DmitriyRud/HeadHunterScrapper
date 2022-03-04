const form = document.getElementById('mainform');
const jobtitle = document.getElementById('jobtitle');
const count = document.getElementById('count');
const countSkills = document.getElementById('countSkills');
const textArea = document.getElementById('results');

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


const counterSkills = getCookie('countskills');
if (counterSkills) {
  countSkills.value = counterSkills;
} else {
  document.cookie = `countskills=${countSkills.value}; max-age=2592000`;
}


form.addEventListener('click', async (e) => {

  if (e.target.type === 'button') {
    e.preventDefault();
    document.cookie = `countskills=${countSkills.value}; max-age=2592000`;
    document.location.href="/";
  }

  if (e.target.type === 'submit') {
    e.preventDefault();
    const response = await fetch('/scrap/', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        jobtitle: jobtitle.value,
        count: count.value,
        countSkills: countSkills.value
      }),
    });

    if (response.ok) {
      const result = await response.json();
      //console.log(result);
      let {
        skillsArr
      } = result;

      console.log(skillsArr);
      skillsArr.sort((a, b) => b.count - a.count);
      textArea.innerHTML = '';
      for (let i = 0; i < skillsArr.length; i++) {
        //const line = skillsArr[i].name + '  :  ' + skillsArr[i].count + '\n';
        if (i > countSkills.value - 1) break;
        const line = `<div class="skill-line">
          <div class="skill-name">
            <p>${skillsArr[i].name}</p>
          </div>
          <div class="skill-count">
            <p>${skillsArr[i].count}</p>
          </div>
          <div class="skill-controls">
            <button class="add-to-plan">В планы</button>
            <button class="add-to-own-skills">В свои навыки</button>
            <button class="add-to-whitelist">В белый лист</button>
            <button class="delete">Удалить</button>
            <button class="add-to-blacklist">В BlackList</button>
          </div>
        </div>`;
        textArea.insertAdjacentHTML('beforeend', line);
      }


    } else {
      console.log('Error launching scrapper');
    }

  }

});
