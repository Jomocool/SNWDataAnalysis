// script.js
const dataTable = document.getElementById('data-table');
const dataContainer = document.getElementById('data-container');
const paginationContainer = document.getElementById('pagination');
const rowsPerPageSelect = document.getElementById('rowsPerPage');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

let currentPage = 1;
let rowsPerPage = parseInt(rowsPerPageSelect.value);

// 模拟的数据，你需要替换成实际的数据
const data = [
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },
  { platform: 'XXXX', address: 'XXXX', time: 'XXXX', label: 'XXXX', popularity: 'XXXX', link: 'XXXX' },

  // 添加更多数据...
];

// 初始化页面
updatePage();

// 根据当前页和每页行数显示数据
function updatePage() {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayData = data.slice(startIndex, endIndex);

  // 清空数据容器
  dataContainer.innerHTML = '';

  // 显示数据
  displayData.forEach(item => {
    const row = createDataRow(item);
    dataContainer.appendChild(row);
  });

  // 添加分页控件
  const totalPages = Math.ceil(data.length / rowsPerPage);
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createPageButton(i);
    paginationContainer.appendChild(pageButton);
  }

  // 更新分页按钮状态
  updatePaginationButtons();
}

// 创建数据行
function createDataRow(dataItem) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${dataItem.platform}</td>
    <td>${dataItem.address}</td>
    <td>${dataItem.time}</td>
    <td>${dataItem.label}</td>
    <td>${dataItem.popularity}</td>
    <td><a href="${dataItem.link}" target="_blank">${dataItem.link}</a></td>
  `;
  return row;
}

// 创建分页按钮
function createPageButton(pageNumber) {
  const button = document.createElement('button');
  button.textContent = pageNumber;
  button.addEventListener('click', () => {
    currentPage = pageNumber;
    updatePage();
  });
  return button;
}

// 更改每页展示行数
function changeRowsPerPage() {
  rowsPerPage = parseInt(rowsPerPageSelect.value);
  currentPage = 1;
  updatePage();
}

// 更新分页按钮状态
function updatePaginationButtons() {
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === Math.ceil(data.length / rowsPerPage);
}

// 左右点击按钮事件
prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updatePage();
  }
});

nextPageButton.addEventListener('click', () => {
  if (currentPage < Math.ceil(data.length / rowsPerPage)) {
    currentPage++;
    updatePage();
  }
});
