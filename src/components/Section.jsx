import React, { Component } from 'react';

class Section extends Component {
  // Το Component Section χρησιμοποιειται ως wrapper 
  // για τα components που περιέχουν τον κώδικα του κάθε section 
  render() {
    const { children, title } = this.props; 
    return (
      <section className="p-5 rounded-lg bg-gray-900 shadow-md shadow-gray-700 flex flex-col gap-6">
        <h1 className="font-bold text-3xl mb-3">{title}</h1>
        {children}
      </section>
    );
  }
}

export default Section;