import React from "react";

import Content from "@/app/components/Content";
import Greetings from "@/app/components/Greetings";
import NameCard from "@/app/components/NameCard";
import News from "@/app/components/News";
import About from "@/app/components/About";
import LinkSection from "@/app/components/LinkSection";
import {FeaturedProjects} from "@/app/components/Projects";
import {LatestBlogPosts} from "@/app/components/Blog";
import {getAllBlogPosts} from "@/lib/blog";

import personalInfo from '../../data/personalInfo.json';
import news from '../../data/news.json'

export const metadata = {
    title: personalInfo.name + "'s Portfolio",
    description: personalInfo.site_description,
    alternates: {
        canonical: "/",
    },
};

export default function Home() {
    const latestBlogPosts = getAllBlogPosts();

    return (
        <Content>
            {personalInfo.greetings_on_homepage &&
                <Greetings greetings_on_homepage={personalInfo.greetings_on_homepage}/>}

            <NameCard/>

            <FeaturedProjects/>

            <LatestBlogPosts posts={latestBlogPosts}/>

            {news.news.length > 0 && <News/>}

            <LinkSection/>

            {personalInfo.self_description_detail.length > 0 && <About/>}

        </Content>
    );
}
