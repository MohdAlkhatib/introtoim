let port;
let sensorValue = 0;
let position, velocity, acceleration, gravity, wind;
let drag = 0.99;
let mass = 50;

function setup() {
  createCanvas(640, 360);
  noFill();

  // Set up serial port
  port = createSerial();
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) port.open(usedPorts[0], 9600);

  position = createVector(width / 2, 0);
  velocity = createVector(0, 0);
  acceleration = createVector(0, 0);
  gravity = createVector(0, 0.5 * mass);
  wind = createVector(0, 0);
}

function draw() {
  background(255);

  // Read analog sensor value from Arduino
  if (port.available() > 0) {
    sensorValue = int(port.read());
    wind.x = map(sensorValue, 0, 1023, -2, 2); // Map sensor to wind strength
  }

  // Physics simulation
  applyForce(wind);
  applyForce(gravity);
  velocity.add(acceleration);
  velocity.mult(drag);
  position.add(velocity);
  acceleration.mult(0);
  
  ellipse(position.x, position.y, mass, mass);

  // Detect bounce
  if (position.y > height - mass / 2) {
    velocity.y *= -0.9;
    position.y = height - mass / 2;
    
    // Send bounce signal to Arduino
    port.write(1);
  }
}

function applyForce(force) {
  let f = p5.Vector.div(force, mass);
  acceleration.add(f);
}
