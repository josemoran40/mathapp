import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";

const TextAnimator = (props) => {
  const animatedValues = useRef([]);

  const { content, duration, onFinish, style, textStyle } = props;

  const textArr = content.trim().split(" ");
  textArr.forEach((_, i) => {
    animatedValues.current[i] = new Animated.Value(0);
  });

  useEffect(() => {
    animated();
  }, []);

  const animated = (toValue = 1) => {
    const animations = textArr.map((_, i) => {
      return Animated.timing(animatedValues.current[i], {
        toValue,
        duration: duration,
        useNativeDriver: true,
      });
    });

    Animated.stagger(duration / 5, animations).start(() => {
      setTimeout(() => {
        if (onFinish) {
          onFinish();
        }
      }, 2000);
    });
  };

  return (
    <View style={[style, styles.textWrapper]}>
      {textArr.map((word, index) => (
        <Animated.Text
          key={`${word}-${index}`}
          style={[
            textStyle,
            {
              opacity: animatedValues.current[index],
              transform: [
                {
                  translateY: Animated.multiply(
                    animatedValues.current[index],
                    new Animated.Value(-5)
                  ),
                },
              ],
            },
          ]}
        >
          {word}
          {`${index < textArr.length ? " " : ""}`}
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default TextAnimator;
