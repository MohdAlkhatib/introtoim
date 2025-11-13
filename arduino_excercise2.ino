int ledPin = 9;  
int brightness = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600); 
}

void loop() {
  if (Serial.available() >= 0) {
    brightness = Serial.parseInt(); 
    brightness = constrain(brightness, 0, 255);
    analogWrite(ledPin, brightness); 
  }
}
