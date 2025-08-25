document.addEventListener("DOMContentLoaded", function() {
    const projectValueInput = document.getElementById("projectValue");
    const componentCostInput = document.getElementById("componentCost");
    const contractorMarkupInput = document.getElementById("contractorMarkup");

    const projectValueDisplay = document.getElementById("projectValueDisplay");
    const componentCostDisplay = document.getElementById("componentCostDisplay");
    const contractorMarkupDisplay = document.getElementById("contractorMarkupDisplay");

    const estimatedSavingsDisplay = document.getElementById("estimatedSavings");
    const costReductionDisplay = document.getElementById("costReduction");

    function calculateSavings() {
        const projectValue = parseFloat(projectValueInput.value);
        const componentCostPercentage = parseFloat(componentCostInput.value) / 100;
        const contractorMarkupPercentage = parseFloat(contractorMarkupInput.value) / 100;

        const criticalComponentCost = projectValue * componentCostPercentage;
        const estimatedMarkupSavings = criticalComponentCost * contractorMarkupPercentage;
        const equivalentProjectCostReduction = (estimatedMarkupSavings / projectValue) * 100;

        projectValueDisplay.textContent = `$${projectValue}M`;
        componentCostDisplay.textContent = `${componentCostPercentage * 100}%`;
        contractorMarkupDisplay.textContent = `${contractorMarkupPercentage * 100}%`;

        estimatedSavingsDisplay.textContent = `$${estimatedMarkupSavings.toFixed(2)}M`;
        costReductionDisplay.textContent = `${equivalentProjectCostReduction.toFixed(2)}%`;
    }

    projectValueInput.addEventListener("input", calculateSavings);
    componentCostInput.addEventListener("input", calculateSavings);
    contractorMarkupInput.addEventListener("input", calculateSavings);

    // Initial calculation
    calculateSavings();
});


