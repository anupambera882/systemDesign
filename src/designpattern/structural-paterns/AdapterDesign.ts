interface WeightMachineAdapter {
  getWeightInKg(): number;
}

interface WeightMachine {
  getWeightInPound(): number;
}

class WeightMachineForBabies implements WeightMachine {
  public getWeightInPound(): number {
    return 28;
  }
}

class WeightMachineAdapterImpl implements WeightMachineAdapter {
  public constructor(private weightMachine: WeightMachine) {
    this.weightMachine = weightMachine;
  }

  public getWeightInKg(): number {
    const weightInPound = this.weightMachine.getWeightInPound();
    const weightInKg = weightInPound * 0.45;
    return weightInKg;
  }
}

// client code
const weightMachineAdapter = new WeightMachineAdapterImpl(
  new WeightMachineForBabies()
);
console.log(weightMachineAdapter.getWeightInKg());
