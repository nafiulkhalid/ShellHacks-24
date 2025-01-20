
// dashboard.js
const ctx = document.getElementById('habitHistogram').getContext('2d');

const labels = ['Soft Drinks', 'Ice Cream', 'Fast Food Burger', 'Chocolate', 'Cereal'];
const dataValues = [0, 0, 0, 0, 0]; // Initialize with zeros
const colors = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)'
];

const habitHistogram = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Consumption Frequency',
            data: dataValues,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.2', '1')), // Make border colors opaque
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                min: 0,      // Set minimum value of y-axis
                max: 10,     // Set maximum value of y-axis
                ticks: {
                    stepSize: 1  // Set step size to 1 for y-axis ticks
                }
            }
        }
    }
});

// Array to hold records
let records = [];
function checkRecordExistence(date) {
    // Ensure the date is in the correct format (YYYY-MM-DD)
    return records.some(record => record.date === date);
}

// Function to calculate BMI
function calculateBMI() {
    const heightFeet = parseInt(document.getElementById('heightFeet').value) || 0;
    const heightInches = parseInt(document.getElementById('heightInches').value) || 0;
    const weight = parseInt(document.getElementById('weight').value) || 0;

    // Convert height to inches
    const heightInTotalInches = (heightFeet * 12) + heightInches;

    // Calculate BMI: (weight in pounds / (height in inches * height in inches)) * 703
    const bmi = (weight / (heightInTotalInches * heightInTotalInches)) * 703;

    // Display BMI result
    const bmiResult = document.getElementById('bmiResult');
    const bmiDescription = document.getElementById('bmiDescription');

    if (!isNaN(bmi) && bmi > 0) {
        bmiResult.textContent = `Your BMI is ${bmi.toFixed(2)}`;

        // Description based on BMI value
        if (bmi < 18.5) {
            bmiDescription.textContent = "You are underweight.";
        } else if (bmi < 24.9) {
            bmiDescription.textContent = "You have a normal weight.";
        } else if (bmi < 29.9) {
            bmiDescription.textContent = "You are overweight.";
        } else {
            bmiDescription.textContent = "You are obese.";
        }
    } else {
        bmiResult.textContent = "Please enter valid values.";
        bmiDescription.textContent = "";
    }
}

// Add event listener for the 'Calculate BMI' button
document.getElementById('calculate-bmi').addEventListener('click', calculateBMI);

// Function to update the records table
function updateRecordTable() {
    const recordTableBody = document.getElementById('recordTable').querySelector('tbody');
    recordTableBody.innerHTML = ''; // Clear existing records

    // Populate table with records
    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.month}</td>
            <td>${record.year}</td>
            <td>${record.softDrinks}</td>
            <td>${record.iceCream}</td>
            <td>${record.fastFood}</td>
            <td>${record.chocolate}</td>
            <td>${record.cereal}</td>
            <td>${record.bmi}</td>
        `;
        recordTableBody.appendChild(row);
    });
}

// Function to add a record
function addRecord(date, month, year, softDrinks, iceCream, fastFood, chocolate, cereal, bmi) {
    records.push({ date, month, year, softDrinks, iceCream, fastFood, chocolate, cereal, bmi });
    updateRecordTable();
}

// Define facts for each food/drink item
const facts = {
    'Soft Drinks': [
        "The acidity in soft drinks can increase the risk of dental erosion by 32%.",
        "Drinking a can of sugary soda can spike blood sugar by 25-50% in those with insulin resistance.",
        "Consuming two or more sodas daily increases the risk of kidney disease by 30%.",
        "Daily soft drink consumption can increase the risk of high blood pressure by 16-20%.",
        "Regular cola consumption reduces bone mineral density by 3-5% in women.",
        "Drinking one or more sugary beverages daily increases the risk of heart disease by 20%.",
        "Consuming one soda per day increases obesity risk by 33%.",
        "Drinking 1-2 cans of sugary soda per day increases the risk of type 2 diabetes by 26%.",
        "Drinking two or more sodas per day increases the risk of developing gout by 85% due to the high fructose content, which elevates uric acid levels in the blood.",
        "Drinking two or more sugary drinks per day increases the risk of early death by 31%."
    ],
    'Ice Cream': [
        "The high sugar content in ice cream can cause energy slumps or crashes, affecting alertness and performance by 20-30%.",
        "One serving of ice cream can provide 10-20% of your daily caloric intake, leading to gradual weight gain if consumed frequently.",
        "Excessive consumption of high-fat dairy products, like ice cream, can reduce bone density by 3-5% over time due to the imbalance of calcium and fat.",
        "A single serving of ice cream can spike blood sugar levels by 30-50%, particularly in people with insulin resistance or diabetes.",
        "Regular consumption of sugary and fatty foods like ice cream is linked to a 27% increased risk of developing non-alcoholic fatty liver disease (NAFLD).",
        "Eating ice cream frequently can raise triglyceride levels by 15-25%, which is a risk factor for heart disease.",
        "Eating one serving of ice cream daily can increase the risk of weight gain and obesity by 40% over time.",
        "The high sugar content in ice cream can increase the risk of cavities and tooth decay by 70%, especially if dental hygiene is poor.",
        "Regular consumption of ice cream can increase the risk of heart disease by 25-30% due to its high levels of saturated fats.",
        "Daily consumption of ice cream significantly increases the risk of developing type 2 diabetes by 40%."
    ],
    'Fast Food Burger': [
        "Fast food burger is designed to be highly palatable, leading to increased cravings and consumption by 40-50% over time.",
        "Consuming processed ingredients in fast food burgers regularly can increase the risk of digestive problems like bloating and indigestion by 20-25%.",
        "A fast food burger meal can provide 20-30% more daily calories than needed, contributing to weight gain over time if consumed frequently.",
        "Regular fast food consumption, due to its high sodium content, can raise blood pressure by 20-30%, increasing the risk of hypertension.",
        "The high saturated fat in fast food burgers can raise LDL cholesterol by 20-30%, leading to an increased risk of heart disease.",
        "Eating fast food burgers more than twice a week increases the risk of obesity by 50-60%.",
        "Regular consumption of fast food burgers raises the risk of developing type 2 diabetes by 25-30%.",
        "Frequent consumption of fast food can increase the risk of stroke by 25-30%, largely due to high sodium and unhealthy fats.",
        "Regular consumption of fast food burgers increases the risk of heart disease by 40-50%, due to high levels of unhealthy fats and processed ingredients.",
        "Consuming processed meats in fast food burgers (like bacon) increases the risk of colorectal cancer by 18% per 50 grams of processed meat consumed daily."
    ],
    'Chocolate': [
        "A single candy bar can contain up to 20-30% of the daily recommended limit for saturated fat, contributing to long-term health concerns if consumed regularly.",
        "One candy bar can provide 10-20% of the recommended daily caloric intake, leading to gradual weight gain if consumed frequently.",
        "The sugar content in candy bars can increase the risk of cavities and tooth decay by 70%, especially with poor oral hygiene.",
        "Eating a candy bar can spike blood sugar levels by 30-50%, which can be particularly harmful to individuals with insulin resistance or diabetes.",
        "A single candy bar can provide 25-50% of the daily recommended sugar intake, which can contribute to weight gain and metabolic disorders over time.",
        "Eating a candy bar daily increases the risk of weight gain and obesity by 50% due to its high sugar and fat content.",
        "Regular consumption of chocolate bars high in dairy fat can raise LDL cholesterol by 10-15%, contributing to a higher risk of heart disease.",
        "Consuming chocolate bars high in sugar and unhealthy fats increases the risk of heart disease by 20-25% over time.",
        "Frequent consumption of sugary chocolate increases the risk of developing non-alcoholic fatty liver disease by 25%.",
        "Regular consumption of sugary chocolate increases the risk of developing type 2 diabetes by 30-40% due to high sugar content and its effects on insulin resistance."
    ],
    'Cereal': [
        "Sugary cereals provide 20-30% of daily caloric intake without offering significant nutritional benefits, leading to poor overall nutrition over time.",
        "Eating sugary cereal can spike blood sugar levels by 40-60%, particularly in individuals with insulin resistance or diabetes.",
        "A single serving of some sugary cereals can provide 40-50% of the daily recommended sugar limit, contributing to overconsumption of sugar.",
        "Regular consumption of sugary cereals can increase the risk of cavities and tooth decay by 60-70% due to their high sugar content.",
        "Eating sugary cereal more than 3 times a week can increase the risk of weight gain by 20-25%, especially in children and adults with sedentary lifestyles.",
        "Relying on sugary cereals can lead to nutrient deficiencies, reducing essential vitamin and mineral intake by 20-30% compared to more nutritious breakfast options.",
        "Children who eat sugary breakfast cereals regularly have a 33% higher risk of developing obesity over time.",
        "Regular consumption of high-sugar cereals can increase the risk of insulin resistance by 25-30%, which is a precursor to type 2 diabetes.",
        "Consuming highly processed sugary cereals regularly increases the risk of heart disease by 20% due to refined carbohydrates and added sugars.",
        "Regular consumption of sugary cereals can increase the risk of developing type 2 diabetes by 22%, especially in individuals with poor dietary habits."
    ]
};

// Function to display facts based on consumption
function displayFact() {
    const factDisplay = document.getElementById('fact-display'); // Ensure you have this element in your HTML
    const selectedItem = document.getElementById('search').value;
    const count = dataValues[labels.indexOf(selectedItem)];

    // If count is greater than zero, display the corresponding fact
    if (count > 0) {
        const factIndex = count - 1; // Zero-based index
        const selectedFacts = facts[selectedItem];
        factDisplay.textContent = selectedFacts[factIndex] || "No more facts available for this item.";
    } else {
        factDisplay.textContent = ""; // Clear fact display if count is 0
    }
}

// Modify the event listener for the 'Add' button
document.getElementById('add-item').addEventListener('click', function() {
    const selectedItem = document.getElementById('search').value;
    const index = labels.indexOf(selectedItem);
    
    if (index !== -1) {
        if (dataValues[index] < 10) {
            dataValues[index]++;
        }
        // Update the histogram
        habitHistogram.update();

        // Update the displayed fact
        displayFact();

        // Get current date
        const date = new Date();
        addRecord(date.toLocaleDateString(), date.getMonth() + 1, date.getFullYear(), 
            dataValues[0], dataValues[1], dataValues[2], dataValues[3], dataValues[4], null);
        
    } else {
        console.log("Item not found in labels.");
    }
});

// Modify the event listener for the 'Remove' button
document.getElementById('remove-item').addEventListener('click', function() {
    const selectedItem = document.getElementById('search').value;
    const index = labels.indexOf(selectedItem);

    if (index !== -1) {
        if (dataValues[index] > 0) {
            dataValues[index]--;
        }
        // Update the histogram
        habitHistogram.update();
        // Update the displayed fact
        displayFact();
        // Get current date
        const date = new Date();
        addRecord(date.toLocaleDateString(), date.getMonth() + 1, date.getFullYear(), 
            dataValues[0], dataValues[1], dataValues[2], dataValues[3], dataValues[4], null);
    } else {
        console.log("Item not found in labels.");
    }
});

