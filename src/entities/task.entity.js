class Task {
  constructor({id, title, description, status = 'pending'}) {
    this.id = Math.floor(Math.random() * 100) + Date.now(); // Generate a random ID
    this.title = title;
    this.description = description;
    this.status = status; // 'pending', 'in-progress', 'completed'
  }

  isValid() {
    const propertyNames = Object.getOwnPropertyNames(this);
    const amountInvalid = propertyNames
      .map(property => (!!this[property] ? null : `${property} is missing!`))
      .filter(item => !!item);

      return {
        valid: amountInvalid.length === 0,
        error: amountInvalid
      }

  }

  updateStatus(newStatus) {
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (validStatuses.includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error('Invalid status');
    }
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status
    };
  }
}
module.exports = Task;