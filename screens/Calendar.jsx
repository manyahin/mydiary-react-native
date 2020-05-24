import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment';

import * as theme from '../util/theme';

import TopBar from '../components/TopBar';
import { DbContext } from '../stores/db';

export default function CalendarScreen({ navigation }) {

    const Db = React.useContext(DbContext);

    const [calendar, setCalendar] = React.useState({});

    useEffect(() => {
        Db.getOnlyNotesDates()
            .then(data => {
                // make list of dates with count of posts
                return data.map(el => el.created_at)
                    .reduce((acc, curr) => {
                        const day = moment(curr).startOf('day').format('YYYY-MM-DD');

                        if (acc.has(day)) acc.set(day, acc.get(day) + 1);
                        else acc.set(day, 1);

                        return acc;
                    }, new Map());
            })
            .then(activeDates => {
                if (!activeDates.size) return activeDates;

                // fill all the monthes
                let currDay = moment(activeDates.keys().next().value).startOf('month');
                const lastDay = moment().endOf('month');

                do {
                    let currDayFormat = currDay.format('YYYY-MM-DD');

                    if (!activeDates.has(currDayFormat)) {
                        activeDates.set(currDayFormat, 0);
                    }

                    currDay = currDay.add(1, 'day');
                } while (currDay < lastDay);

                return activeDates;
            })
            .then(dates => {
                // build calendar object
                let calendar = {};

                for (const [dayFormat, cnt] of dates) {
                    const date = moment(dayFormat);

                    let year = date.format('YYYY');
                    let month = date.format('MMMM');
                    let day = date.format('D');

                    if (!calendar[year]) calendar[year] = {};
                    if (!calendar[year][month]) calendar[year][month] = {};

                    calendar[year][month][day] = {
                        format: dayFormat,
                        cnt: cnt
                    };
                }

                return calendar;
            })
            .then(calendar => {
                setCalendar(calendar);
            })
    }, []);

    const styles = StyleSheet.create({
        day: {
            height: 30,
            width: 30,
            backgroundColor: 'pink',
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        days: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    });

    const Day = (params) => {
        const isActiveDay = params.day.cnt > 0 ? true : false;
        const bgColor = isActiveDay ? 'green' : 'white';
        const pressCb = () => {
            if (!isActiveDay) return;
            return navigation.navigate('Read', {
                day: params.day.format
            });
        }
        return (
            <View style={[styles.day, { backgroundColor: bgColor }]}>
                <Text onPress={pressCb}>{params.number}</Text>
            </View>
        )
    };

    const Days = (params) => {
        return (
            <View style={styles.days}>
                {Object.entries(params.days).map(([number, day]) => {
                    return <Day key={day.format} number={number} day={day}></Day>
                })}
            </View>
        );
    };

    const renderMonthes = (monthes) => {
        return Object.entries(monthes).map(([month, days]) => {
            const monthHeader = <Text h4>{month}</Text>;
            const formattedDays = <Days days={days}></Days>
            return [monthHeader, formattedDays];
        });
    };

    const renderCalendar = (calendar) => {
        return Object.entries(calendar).map(([year, monthes]) => {
            const yearHeader = <Text h3>{year}</Text>;
            const monthesAndDays = renderMonthes(monthes);
            return [yearHeader, monthesAndDays];
        });
    };

    return (
        <View style={theme.baseContainer}>
            <TopBar />
            <View>
                {renderCalendar(calendar)}
            </View>
        </View>
    )
}
