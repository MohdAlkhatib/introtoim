const int ldrPin = A0;
const int greenLED = 6;
int lightThreshold = 600;

void setup() {
  pinMode(greenLED, OUTPUT);
}

void loop() {
  int success = 0;

  for (int i = 0; i < 3; i++) {
    if (analogRead(ldrPin) > lightThreshold) {
      delay(3000); // light on for 3 seconds
      if (analogRead(ldrPin) < lightThreshold) {
        success++;
        delay(3000); // light off for 3 seconds
      }
    }
    delay(500); // brief pause between attempts
  }

  // if the user does the signal correctly 3 times in a row, turn on the LED
  if (success == 3) {
    digitalWrite(greenLED, HIGH);
    delay(3000);
    digitalWrite(greenLED, LOW);
  }

  delay(1000); // short pause before restarting
}
