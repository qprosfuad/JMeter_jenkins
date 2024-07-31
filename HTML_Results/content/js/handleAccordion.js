const chartInstances = {};

function destroyChart(elementId) {
    if (chartInstances[elementId]) {
        chartInstances[elementId].destroy();
        delete chartInstances[elementId];
    }
}

function handleAccordionClick(collapseId, contentId) {
    const collapseDiv = document.getElementById(collapseId);

    collapseDiv.addEventListener('hide.bs.collapse', function () {
        destroyChart(contentId);
        setTimeout(() => {
            document.getElementById(contentId).innerHTML = '';
            console.log("finished");
        }, 350);
    });
}