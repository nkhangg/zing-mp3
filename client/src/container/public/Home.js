import React, { useEffect } from 'react';
import { Artists, Banner, ChartSection, Event, NewRelease, Section, Slider } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/action';
const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getHome());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { friday, newEveryday, top100, xone, newMusic, weekChart, event, singers } = useSelector(
        (state) => state.app,
    );

    return (
        <div className="w-full">
            <Slider />
            <Section data={friday} artistsNames={true} />
            <Section data={newEveryday} artistsNames={true} />
            <NewRelease />
            <Section data={top100} />
            <Section data={newMusic} />
            <ChartSection />
            <Banner data={weekChart} />
            <Artists slide={true} data={singers} />
            <Section data={xone} />
            <Event data={event} />
        </div>
    );
};

export default Home;
