import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment';

import * as theme from '../util/theme';

import TopBar from '../components/TopBar';
import { DbContext } from '../stores/db';
import { render } from 'react-dom';

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
                        else acc.set(day, 0);

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
                console.log(calendar);
                setCalendar(calendar);
            })
    }, []);


    const renderCalendar = (calendar) => {
        return Object.entries(calendar).map(([year, monthes]) => {
            let ret = (<Text>{year}</Text>);
            return ret + renderMonthes(monthes);
        });
    };

 
    return (
        <View style={theme.baseContainer}>
            <TopBar />
            <View>
                <Text>In developming...</Text>
                {renderCalendar(calendar)}
            </View>
        </View>
    )
}
