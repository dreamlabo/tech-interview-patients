
class Patient {
    // #age;
    // #reason;
    // #insurance;
    // #orders;

    constructor(reason, age, insurance) {
        this.reason = reason;
        this.age = age;
        this.insurance = insurance;
        this.orders = new Set();
    }

    getReason() {
        return this.reason;
    }

    getAge() {
        return this.age;
    }

    getInsurance() {
        return this.insurance;
    }

    getOrders() {
        return this.orders;
    }
    
    setOrders(order) {
        this.orders.add(order)
    }
}

// Scenarios from challenge
const scenario1 = {
    reason: "annual exam",
    age: function determineAge(patientAge) {
            return patientAge === 36;
    },
    insurance: function determineInsurance(ins) {
        return ins.toLowerCase() === 'medicare'
    },
    orders: ['folic acid', 'complete blood count']
}

const scenario2 = {
    reason: "annual exam",
    age: function determineAge(patientAge) {
        return patientAge >= 41;
    },
    insurance: function determineInsurance(ins){
                return ins.toLowerCase() === 'medicare' || ins.toLowerCase() === 'aetna'
            },
    orders: ['complete blood count', 'cancer screen']
}

const scenario3 = {
    reason: "annual exam",
    age: function determineAge(patientAge) {
        return patientAge > 20 && patientAge < 40;
    },
    insurance: function determineInsurance(ins) {
        return ins.toLowerCase !== 'medicare'
    },
    orders: ['complete blood count', 'diabetes monitoring', 'cancer screen']
}

const scenario4 = {
    reason: "post operation hip",
    age: function determineAge() {
        return true;
    },
    insurance: function determineInsurance(ins) {
        return true;
    },
    orders: ['xray hip', 'stitch removal']
}

const scenarios = [];
scenarios.push(scenario1)
scenarios.push(scenario2)
scenarios.push(scenario3)
scenarios.push(scenario4)

// Create Patients
const patientFive = new Patient("annual exam", 36, 'medicare');
const patientSix = new Patient("annual exam", 21, 'medicare');
const patientSeven = new Patient("post operation hip", 52, 'medicare');
const patientEight = new Patient("annual exam", 41, 'medicare');

function returnOrders(patient) {
    for(const scenario of scenarios) {
        if(scenario.reason.toLowerCase() === patient.getReason().toLowerCase() 
                && scenario.age(patient.getAge())
                    && scenario.insurance(patient.getInsurance().toLowerCase())){
            for(const order in scenario.orders) {
                patient.setOrders(scenario.orders[order])
            }      
        }
    }
}

function testOrderCorrectness(orderSet, expectedValues) {
    for (const value of expectedValues) {
        if(!orderSet.has(value)) {
            return false;
        }
    }
    return true;
}

// Expected return 'order(s) value to use for testing
const patientFiveExpectedOrders = [
    "folic acid",
    "complete blood count",
    "diabetes monitoring",
    "cancer screen"
]

const patientSixExpectedOrders = [
    "complete blood count",  
    "diabetes monitoring",
    "cancer screen"
]

const patientSevenExpectedOrders = [
    "xray hip", 
    "stitch removal"
]

const patientEightExpectedOrders = [
    "complete blood count", 
    "cancer screen"
]

// Put patients into an array to bulk process the patients
const patients = [];
patients.push(patientFive)
patients.push(patientSix)
patients.push(patientSeven)
patients.push(patientEight)

// Get orders for each patient
patients.map(patient => {
    returnOrders(patient)
})

// Assertions/Testing
console.log()
console.log("Patient Five: ", patientFive)
console.log("Patient Five [Orders]: ", patientFive.getOrders())
console.log(`Test Patient Five orders: ${testOrderCorrectness(patientFive.getOrders(), patientFiveExpectedOrders) ? "PASSED" : "FAILED"}.`)

console.log()
console.log("Patient Six: ", patientSix)
console.log("Patient Six [Orders]: ", patientSix.getOrders())
console.log(`Test Patient Six orders: ${testOrderCorrectness(patientSix.getOrders(), patientSixExpectedOrders) ? "PASSED" : "FAILED"}.`)

console.log()
console.log("Patient Seven: ", patientSeven)
console.log("Patient Seven [Orders]: ", patientSeven.getOrders())
console.log(`Test Patient Seven orders: ${testOrderCorrectness(patientSeven.getOrders(), patientSevenExpectedOrders) ? "PASSED" : "FAILED"}.`)

console.log()
console.log("Patient Eight: ", patientEight)
console.log("Patient Eight [Orders]: ", patientEight.getOrders())
console.log(`Test Patient Six orders: ${testOrderCorrectness(patientEight.getOrders(), patientEightExpectedOrders) ? "PASSED" : "FAILED"}.`)