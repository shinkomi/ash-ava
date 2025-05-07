let serchText = { text: [] };
let avaData = [];

async function loadAva() {
  try {
    const response = await fetch("ava.json");
    avaData = await response.json();
    renderTable();
  } catch (error) {
    console.error("データ取得に失敗:", error);
  }
}

function renderTable() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  let hasResults = false;

  avaData.forEach(ava => {
    const row = document.createElement("tr");
    row.setAttribute("ava-name-m", ava.name_m || "");
    row.setAttribute("ava-name-f", ava.name_f || "");

    row.innerHTML = `
      <td>${ava.name_m}<br><img src="${ava.image_m}" alt="${ava.name_m}" class="icon-img"></td>
      <td>${ava.name_f}<br><img src="${ava.image_f}" alt="${ava.name_f}" class="icon-img"></td>
    `;

    tbody.appendChild(row);
    hasResults = true;
  });

  textSerch();
  if (!hasResults) {
    const noDataRow = document.createElement("tr");
    noDataRow.innerHTML = `<td colspan="3" style="text-align: center;">該当データなし。</td>`;
    tbody.appendChild(noDataRow);
  }
}

// 検索
function textSerch() {
  const rows = document.querySelectorAll("tbody tr");
  const textarea = document.getElementById("textarea")
  console.log(textarea.value);

  document.querySelectorAll("tbody .no-data").forEach(row => row.remove());

  let visibleRowCount = 0;
  let nCount = 0;
  if(textarea.value !== "") {

    rows.forEach(row => {
      nCount++;
      const avaNameM = row.getAttribute("ava-name-m");
      const avaNameF = row.getAttribute("ava-name-f");
      if(avaNameM!==null && avaNameF!==null) {
        console.log(avaNameM);
        console.log(textarea.value);
        let matchText;
        var result = avaNameM.search(textarea.value);
        if(result !== -1) {
          console.log("Mで一致。");
          serchText['text'].push(avaNameM)
          matchText = serchText.text.includes(avaNameM)
        } else {
          console.log(avaNameF);
          result2 = avaNameF.search(textarea.value);
          if(result2 !== -1) {
            console.log("Fで一致。");
            matchText = serchText.text.includes(avaNameF)
          } else {
            console.log("不一致。");
            matchText = serchText.text.includes(avaNameF)
          }
        }
        row.style.display = matchText ? "" : "none";
        if (matchText) visibleRowCount++;
        console.log(nCount);
      }
    });

    const tbody = document.querySelector("tbody");
    if (visibleRowCount === 0) {
      const noDataRow = document.createElement("tr");
      noDataRow.innerHTML = `<td colspan="3" class="no-data">該当データなし。</td>`;
      tbody.appendChild(noDataRow);
    }
  } else {
    rows.forEach(row => {
      row.style.display = "";
      visibleRowCount++;
    });
  }
  serchText = { text: [] };
}

function resetSerch() {
  serchText = { text: [] };
  document.getElementById("textarea").value = "";
  textSerch();
}

document.addEventListener("DOMContentLoaded", function() {
  loadAva().then(() => {
    textSerch();
  });
});
