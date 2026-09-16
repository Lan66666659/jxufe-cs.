import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code2, GraduationCap, Users, Wrench } from 'lucide-react';
import { useSiteMotion } from '../hooks/use-site-motion';
import { MotionToggle } from '../components/SiteMotion';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from '../components/animate-ui/components/radix/tabs';
import { Highlight, HighlightItem } from '../components/animate-ui/primitives/effects/highlight';
import { ActivityCard, JoinBanner, PostRow, Reveal, SectionHeading } from '../components/shared';
import { ActionLink } from '../components/motion';
import ActivityShowcase from '../components/ActivityShowcase';
import SpotlightCard from '../components/react-bits/SpotlightCard';
import Magnet from '../components/react-bits/Magnet';
import DecryptedText from '../components/react-bits/DecryptedText';
import {
  AssociationTitle,
  HeroParticles,
  AnimatedNumber,
  CommunityRibbon,
} from '../components/ReactBits';
import { departmentIcons } from '../data/icons';
import content, { departments } from '../data/site';

export default function Home() {
  const { paused, reduced } = useSiteMotion();
  return (
    <>
      <section className="campus-hero campus-hero-bold" data-motion-paused={paused}>
        <HeroParticles paused={paused} />
        <div className="hero-orbit" aria-hidden="true">
          <span>JXUFE / 1996</span>
        </div>
        <div className="site-container motion-toolbar">
          <span>把兴趣变成真本事</span>
          <MotionToggle />
        </div>
        <div className="site-container hero-grid">
          <div className="campus-hero-copy">
            <div className="established">
              <span />
              学术科技类社团
              <span className="established-divider" />
              成立于 1996 年
            </div>
            <AssociationTitle paused={paused} />
            <p className="association-motto">探索技术 · 分享知识 · 共同成长</p>
            <p className="campus-description">
              在这里，学习编程、动手维修、研究数据。
              <br />
              每周与同学们一起交流，让技术走进校园生活。
            </p>
            <div className="hero-actions">
              <Magnet padding={24} magnetStrength={10} disabled={paused} data-effect="Magnet">
                <ActionLink className="button-primary" to="/about">
                  了解计协
                  <ArrowRight size={19} />
                </ActionLink>
              </Magnet>
              <ActionLink className="button-outline" to="/contact">
                加入交流群
                <Users size={19} />
              </ActionLink>
            </div>
            <div className="hero-campus">
              <GraduationCap size={18} />
              麦庐园校区 · 计算机与人工智能学院
            </div>
          </div>
          <ActivityShowcase />
        </div>
        <div className="site-container hero-shortcuts">
          <Highlight
            mode="parent"
            controlledItems
            hover
            className="shortcut-highlight"
            containerClassName="shortcut-highlight-container"
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <div className="shortcuts-grid">
              {[
                {
                  icon: Code2,
                  title: '每周例会',
                  description: '编程与计算机知识教学',
                  to: '/activities#activity-1',
                },
                {
                  icon: Wrench,
                  title: 'PC 卫士进校园',
                  description: '为全校师生提供维护服务',
                  to: '/activities#activity-2',
                },
                {
                  icon: BookOpen,
                  title: '知识分享',
                  description: '教程、工具与实践笔记',
                  to: '/resources',
                },
              ].map(({ icon: Icon, title, description, to }) => (
                <HighlightItem key={title} value={title}>
                  <Link to={to} className="shortcut">
                    <span className="shortcut-icon">
                      <Icon size={25} />
                    </span>
                    <span>
                      <strong>{title}</strong>
                      <small>{description}</small>
                    </span>
                    <ArrowRight size={19} />
                  </Link>
                </HighlightItem>
              ))}
            </div>
          </Highlight>
        </div>
      </section>
      <CommunityRibbon paused={paused} />
      <div className="site-container">
        <section className="section association-intro">
          <Reveal>
            <div className="section-kicker">关于计协</div>
            <h2>
              和同学一起，
              <br />
              把计算机学明白。
            </h2>
          </Reveal>
          <Reveal className="association-intro-copy">
            <p>
              江西财经大学计算机协会成立于 1996
              年，面向全校计算机爱好者开展学习、交流与实践活动。无论来自哪个专业、有无基础，都可以选择感兴趣的课程参加。
            </p>
            <div className="intro-facts">
              <span>
                <AnimatedNumber value={1996} from={1900} paused={paused} />
                成立年份
              </span>
              <span>
                <AnimatedNumber value={5} paused={paused} />
                协作部门
              </span>
              <span>
                <strong>每周</strong>例会交流
              </span>
            </div>
            <Link className="text-link" to="/members">
              认识协会成员
              <ArrowRight size={17} />
            </Link>
          </Reveal>
        </section>
        <section className="section department-section">
          <SectionHeading
            label="部门架构"
            title="五个部门，一起学习"
            description="部门之间不设学习门槛，每周例会向所有社员开放。"
            to="/departments"
            linkText="查看部门介绍"
          />
          <Tabs defaultValue="software" className="department-switch">
            <TabsList
              className="department-tab-list h-auto w-full gap-1 rounded-xl bg-[#edf4ff] p-1.5"
              aria-label="探索部门"
            >
              {departments.map((department, index) => {
                const Icon = departmentIcons[index];
                return (
                  <TabsTrigger
                    key={department.id}
                    value={department.id}
                    className="department-tab h-14 gap-2 text-base"
                  >
                    <Icon size={21} />
                    {department.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <TabsContents
              className="department-panels"
              transition={
                reduced ? { duration: 0 } : { type: 'spring', stiffness: 250, damping: 32 }
              }
            >
              {departments.map((department, index) => {
                const Icon = departmentIcons[index];
                return (
                  <TabsContent
                    key={department.id}
                    value={department.id}
                    transition={{ duration: reduced ? 0 : 0.25 }}
                  >
                    <SpotlightCard
                      className="department-overview"
                      spotlightColor="rgba(35, 104, 230, 0.10)"
                    >
                      <div className="department-identity">
                        <div className="department-emblem">
                          <Icon size={54} strokeWidth={1.4} />
                        </div>
                        <div>
                          <span data-effect="DecryptedText">
                            {paused ? (
                              department.en
                            ) : (
                              <DecryptedText
                                text={department.en}
                                animateOn="view"
                                speed={35}
                                maxIterations={9}
                              />
                            )}
                          </span>
                          <h3>{department.title}</h3>
                        </div>
                      </div>
                      <div className="department-description">
                        <h4>{department.subtitle}</h4>
                        <p>{department.description}</p>
                        <div className="tag-row">
                          {department.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <Link to={`/departments#${department.id}`} className="text-link">
                          了解{department.title}
                          <ArrowRight size={17} />
                        </Link>
                      </div>
                    </SpotlightCard>
                  </TabsContent>
                );
              })}
            </TabsContents>
          </Tabs>
        </section>
        <section className="section">
          <SectionHeading
            label="活动风采"
            title="在校园里，做点实在的事"
            description="学习之外，也把掌握的技术用起来。以下是我们的日常活动记录。"
            to="/activities"
            linkText="查看全部活动"
          />
          <div className="activity-mosaic">
            {[content.activities[1], content.activities[0], content.activities[2]].map(
              (activity) => (
                <Reveal key={activity.id}>
                  <ActivityCard activity={activity} />
                </Reveal>
              ),
            )}
          </div>
        </section>
        <section className="section blog-preview">
          <SectionHeading
            label="博客天地"
            title="最近更新"
            description="协会成员的技术笔记、实践经验与工具分享。"
            to="/blog"
            linkText="浏览全部文章"
          />
          <div className="post-list">
            {content.posts.slice(0, 3).map((post, index) => (
              <PostRow key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>
        <JoinBanner paused={paused} />
      </div>
    </>
  );
}
