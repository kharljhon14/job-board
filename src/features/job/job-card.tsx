import { CircleDollarSign } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function JobCard() {
  return (
    <Link href="/">
      <Card className=" hover:shadow-md transition-all duration-100">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <p>SEO Virtual Assistant</p>
            <Badge>Full Time</Badge>
          </CardTitle>
          <CardDescription>
            <div className="flex gap-x-2 items-center">
              <CircleDollarSign />
              <p>$5.00 - $6.00</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3">
            About Us: Nash Global Ventures is a forward-thinking marketing company specializing in
            promoting businesses to new heights. We are currently seeking a proactive and
            detail-oriented Virtual Assistant to drive our customer review outreach efforts and
            manage our mystery shopper program, delivering exceptional results for our clients. Role
            and Responsibilities: As an SEO Virtual Assistant at Nash Global Ventures, you will play
            a pivotal role in elevating our businesses through SEO and digital marketing. Your main
            tasks will include: • Optimizing Google Business Profiles (GBPs) • Writing SEO-Optimized
            Website Content • Researching & acquiring backlinks • Ordering SEO services to boost our
            websites rankings • Performing keyword research • Tracking our website & GBP rankings
            Requirements: • Reliable and dependable personality. • Exceptional written communication
            skills in English. • Proficiency in email and messaging platforms. • Strong
            organizational skills with meticulous attention to detail. • Self-motivated and capable
            of working independently while meeting set deadlines. • Comfortable with remote work
            arrangements and task management. • Familiarity with Google Suite (Gmail, Google Sheets,
            Google Docs) is preferred. • Prior experience with SEO is preferred, but not required.
            Bonus points if you have any of the following characteristics: * Experience
            building/acquiring backlinks * Knowledge of Trust Flow/Citation Flow, UR/DR, and other
            SEO Terms * Experience using SEO Tools such as AHREFS, Majestic, Moz, etc. * Experience
            ranking websites in the top spots of Google * Experience with Google My Business
            listings Benefits: • Flexible work hours that accommodate your schedule and commitments.
            • Opportunity to make a substantial impact on the success of multiple businesses through
            your efforts. • Competitive compensation structured around performance and task
            completion. • Potential for continued collaboration and expanded responsibilities as
            Nash Global Ventures continues to grow. To apply, please submit a resume and answer the
            below questions: 1. Describe a time when you were challenged at work and were able to
            overcome it. 2. Please specify your hours of availability and your time zone. 3. Please
            rate your English fluency from 1-10 with 10 being a near-native speaker with no problem
            conversing at full speed in a video chat, and 1 being not fluent at all. 4. Please
            describe a time when you were not successful with a project. Why did this happen? 5.
            What are you passionate about in your life?
          </p>
        </CardContent>
        <CardFooter>Sept 18, 2025</CardFooter>
      </Card>
    </Link>
  );
}
