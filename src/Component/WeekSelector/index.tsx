import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const WeekdaySelector = () => {
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [selectedRange, setSelectedRange] = useState({start: null, end: null});
  console.log('sellllll', selectedRange);
  const handleDaySelection = day => {
    setSelectedRange(prevRange => {
      if (prevRange.start === null || prevRange.end !== null) {
        return {start: day, end: null}; // Set start or reset the range
      } else {
        return {...prevRange, end: day}; // Set end of the range
      }
    });
  };

  const isDayInRange = day => {
    const {start, end} = selectedRange;
    if (!start) return false;
    if (!end) return day === start;

    const startIndex = weekdays.indexOf(start);
    const endIndex = weekdays.indexOf(end);
    const dayIndex = weekdays.indexOf(day);

    if (startIndex <= endIndex) {
      return dayIndex >= startIndex && dayIndex <= endIndex;
    } else {
      return dayIndex >= endIndex && dayIndex <= startIndex;
    }
  };

  const getSelectedDays = () => {
    const {start, end} = selectedRange;
    if (!start) return [];
    if (!end) return [start];

    const startIndex = weekdays.indexOf(start);
    const endIndex = weekdays.indexOf(end);

    if (startIndex <= endIndex) {
      return weekdays.slice(startIndex, endIndex + 1);
    } else {
      return weekdays.slice(endIndex, startIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekdaysContainer}>
        {weekdays.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              isDayInRange(day) && styles.selectedDayButton,
            ]}
            onPress={() => handleDaySelection(day)}>
            <Text
              style={[
                styles.dayButtonText,
                isDayInRange(day) && styles.selectedDayButtonText,
              ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputField: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 20,
    justifyContent: 'center',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dayButton: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  selectedDayButton: {
    backgroundColor: '#0F8BC2',
  },
  dayButtonText: {
    color: '#000',
    fontFamily: 'WorkSans-Regular',
  },
  selectedDayButtonText: {
    color: '#fff',
    fontFamily: 'WorkSans-Regular',
  },
  selectedDaysText: {
    color: '#333',
    fontSize: 16,
  },
});

export default WeekdaySelector;
