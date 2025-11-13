int ledPin = 3;          // LED that flashes on bounce
int sensorPin = A0;      // Analog sensor (controls wind)
int sensorValue = 0;     

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // Read analog sensor
  sensorValue = analogRead(sensorPin);
  // Send sensor value to P5
  Serial.println(sensorValue);
  
  // Check for bounce signal from P5
  if (Serial.available() > 0) {
    int bounce = Serial.read();
    if (bounce == 1) {
      digitalWrite(ledPin, HIGH);
      delay(100);
      digitalWrite(ledPin, LOW);
    }
  }

  delay(50);
}
