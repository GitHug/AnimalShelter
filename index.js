class AnimalShelter {
  constructor () {
    this.cats = new AnimalQueue()
    this.dogs = new AnimalQueue()
    this.order = 0
  }

  enqueue (name, type) {
    const { order } = this

    const animal = { name, type, order }

    if (type === 'cat') {
      this.cats.enqueue(animal)
    } else {
      this.dogs.enqueue(animal)
    }
  }

  dequeueAny () {
    const { dogs, cats } = this

    if (!dogs) return cats.dequeue()
    else if (!cats) return dogs.dequeue()

    const dog = dogs.peek()
    const cat = cats.peek()

    if (dog.order < cat.order) {
      return dogs.dequeue()
    } else {
      return cats.dequeue()
    }
  }

  dequeueCat () {
    return this.cats.dequeue()
  }

  dequeueDog() {
    return this.dogs.dequeue()
  }

  printShelter () {
    const cats = []
    const dogs = []

    let cat = this.cats.first
    let dog = this.dogs.first

    while (cat) {
      cats.push(cat.value.name)
      cat = cat.next
    }

    while(dog) {
      dogs.push(dog.value.name)
      dog = dog.next
    }

    console.log('Cats:', cats)
    console.log('Dogs:', dogs)
  }
}

class AnimalQueue {
  constructor() {
    this.first = null
    this.last = null
    this.length = 0
  }

  enqueue (value) {
    const newAnimal = new Node(value)
    if (this.last) this.last.next = newAnimal

    this.last = newAnimal

    if (!this.first) this.first = this.last
  }

  dequeue () {
    if (this.first) {
      const first = this.first

      if (this.first === this.last) this.last = null

      this.first = first.next

      return first && first.value
    }
  }

  peek () {
    return this.first && this.first.value
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

const shelter = new AnimalShelter()
shelter.enqueue('Mjau', 'cat')
shelter.enqueue('Fido', 'dog')
shelter.enqueue('Ludde', 'cat')
shelter.enqueue('Brutus', 'dog')

shelter.printShelter()

console.log(shelter.dequeueCat())
console.log(shelter.dequeueCat())
shelter.printShelter()