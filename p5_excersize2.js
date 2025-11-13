let sendToArduino = 0;
let port;
let baudrate = 9600;
let showConnectButton = true;
let connectBtn;

function setup() {
  createCanvas(640, 480);
  textSize(18);

  port = createSerial();

  // If previously connected, reopen automatically
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], baudrate);
  }

  // Manual connect button
  if (showConnectButton) {
    connectBtn = createButton('Connect to Arduino');
    connectBtn.position(20, 20);
    connectBtn.mousePressed(setupSerial);
  }
}

function setupSerial() {
  if (!port.opened()) {
    port.open('Arduino', baudrate);
  } else {
    port.close();
  }
}

function draw() {
  background(240);

  if (!port.opened()) {
    text("Disconnected - press button to connect", 20, 80);
  } else {
    text("Connected - use arrow keys to adjust brightness", 20, 80);
    text("Brightness: " + sendToArduino, 20, 120);

    // Send the brightness value to Arduino
    port.write(sendToArduino + "\n");
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    sendToArduino -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    sendToArduino += 10;
  }

  sendToArduino = constrain(sendToArduino, 0, 255);
}
