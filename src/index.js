console.log('Interesting!')
console.log('fuck')

// Create heading node
const heading = document.createElement('h1')
heading.textContent = 'Interesting!'

// Append heading node to the DOM
const app = document.getElementById('root')
app.append(heading)
