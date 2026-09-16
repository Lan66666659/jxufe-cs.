import { ActionButton } from '../components/motion';
import { useState } from 'react';
import { useSiteMotion } from '../hooks/use-site-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/animate-ui/components/radix/accordion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Copy,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react';
import SpotlightCard from '../components/react-bits/SpotlightCard';
import FriendAvatar from '../components/FriendAvatar';
import { JoinBanner, PageHeading } from '../components/shared';
import { departmentIcons } from '../data/icons';
import content, { departments, site } from '../data/site';
import {
  AssociationSeal,
  MissionReveal,
  DepartmentGlare,
  ActivityTilt,
  MemberPixels,
  FriendsLoop,
  ShinyLabel,
} from '../components/InteriorEffects';

export function About() {
  return (
    <div className="site-container inner-page about-page">
      <PageHeading
        label="ABOUT THE ASSOCIATION"
        title="协会简介"
        description="成立于 1996 年，面向全校计算机爱好者的学术科技类社团。"
      />
      <section className="about-story">
        <AssociationSeal />
        <div>
          <div className="eyebrow">OUR STORY</div>
          <h2>
            普及知识，连接同好，
            <br />
            一起成为更好的自己。
          </h2>
          <p>{content.intro}</p>
          <Link className="text-link" to="/members">
            认识我们的伙伴
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <MissionReveal />
      <div className="principles-grid grid grid-cols-1 gap-6 min-[801px]:grid-cols-3">
        {[
          {
            icon: Sparkles,
            title: '零基础也能参加',
            description: '不论你来自哪个学院，有没有编程基础，都能从自己感兴趣的知识开始。',
          },
          {
            icon: Users,
            title: '例会向全体社员开放',
            description: '五个部门的例会向所有社员开放。喜欢软件，也可以走进维修课堂。',
          },
          {
            icon: HeartHandshake,
            title: '为师生提供技术服务',
            description: '从日常答疑到 PC 卫士进校园，把学习所得带到校园，帮助身边的人。',
          },
        ].map(({ icon: Icon, title, description }) => (
          <SpotlightCard key={title} className="principle-card">
            <Icon size={27} />
            <h3>{title}</h3>
            <p>{description}</p>
          </SpotlightCard>
        ))}
      </div>
      <JoinBanner />
    </div>
  );
}

export function Departments() {
  return (
    <div className="site-container inner-page departments-page">
      <PageHeading
        label="FIVE DEPARTMENTS · ONE COMMUNITY"
        title="部门架构"
        description="软件、维修、量化、宣传和办公室。每周例会允许所有部门的社员参加。"
      />
      <div className="department-full-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
        {departments.map((department, index) => {
          const Icon = departmentIcons[index];
          return (
            <DepartmentGlare key={department.id} index={index}>
              <section id={department.id} className={`department-full ${department.color}`}>
                <div className="department-full-top flex items-center justify-between font-mono text-label tracking-widest text-accent">
                  <span>
                    0{index + 1} / {department.en}
                  </span>
                  <Icon size={30} />
                </div>
                <h2>{department.title}</h2>
                <h3>{department.subtitle}</h3>
                <p>{department.description}</p>
                <div className="tag-row mt-5 flex flex-wrap gap-2">
                  {department.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link className="text-link" to={`/contact?department=${department.id}`}>
                  和{department.title}一起成长
                  <ArrowUpRight size={16} />
                </Link>
              </section>
            </DepartmentGlare>
          );
        })}
        <section className="department-full department-open">
          <Users size={36} />
          <h2>还没确定部门？</h2>
          <p>可以先参加感兴趣的例会，也可以在招新交流群中咨询各部门的具体安排。</p>
          <Link className="button button-primary" to="/contact">
            咨询部门安排
            <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </div>
  );
}

export function Activities() {
  const [category, setCategory] = useState('全部活动');
  const categories = [
    '全部活动',
    ...new Set(content.activities.map((activity) => activity.category)),
  ];
  const filtered = content.activities.filter(
    (activity) => category === '全部活动' || activity.category === category,
  );
  return (
    <div className="site-container inner-page activities-page">
      <PageHeading
        label="LEARN · BUILD · SHARE"
        title="活动风采"
        description="例会授课、校园服务、新生培训与赛前答疑，记录计协的学习和实践。"
      />
      <div className="filter-bar flex flex-wrap gap-2" aria-label="活动分类">
        {categories.map((item) => (
          <ActionButton
            key={item}
            className={category === item ? 'active' : ''}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
            {item === '全部活动' && <span>{content.activities.length}</span>}
          </ActionButton>
        ))}
      </div>
      <p className="result-count" role="status">
        共 {filtered.length} 项活动
      </p>
      <div className="activity-detail-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7">
        {filtered.map((activity) => (
          <article key={activity.id} id={`activity-${activity.id}`} className="activity-detail">
            <ActivityTilt activity={activity} />
            <div className="activity-detail-copy">
              <span className="eyebrow">ACTIVITY / 0{activity.id}</span>
              <h2>{activity.title}</h2>
              <p>{activity.description}</p>
              <Link className="text-link" to="/contact">
                了解活动与参与方式
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <JoinBanner />
    </div>
  );
}

export function Members() {
  const [year, setYear] = useState('全部');
  const filtered = content.members.filter(
    (member) => year === '全部' || member.role.startsWith(year),
  );
  return (
    <div className="site-container inner-page members-page">
      <PageHeading
        label="THE PEOPLE BEHIND THE COMMUNITY"
        title="优秀骨干"
        description="认识参与协会组织、教学与技术服务的同学们。"
      />
      <div className="filter-bar flex flex-wrap gap-2" aria-label="成员年级">
        {['全部', '25级', '24级', '23级', '22级'].map((item) => (
          <ActionButton
            key={item}
            className={year === item ? 'active' : ''}
            aria-pressed={year === item}
            onClick={() => setYear(item)}
          >
            {item}
          </ActionButton>
        ))}
      </div>
      <p className="result-count" role="status">
        {filtered.length} 位伙伴
      </p>
      <div className="member-grid grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6 min-[1021px]:grid-cols-4">
        {filtered.map((member) => {
          const details = (
            <>
              {member.href ? (
                <div className="member-photo">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    width="300"
                    height="330"
                  />
                </div>
              ) : (
                <MemberPixels member={member} />
              )}
              <div className="member-info">
                <span>{member.role}</span>
                <h2>{member.name}</h2>
                {member.href ? (
                  <p className="member-blog-link">
                    {member.description}
                    <ArrowUpRight size={17} />
                  </p>
                ) : (
                  <p>{member.description}</p>
                )}
              </div>
            </>
          );
          return member.href ? (
            <a
              className="member-card member-card-link"
              key={member.name}
              href={member.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`访问 ${member.name} 的博客（新标签页）`}
            >
              {details}
            </a>
          ) : (
            <article className="member-card" key={member.name}>
              {details}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function Friends() {
  return (
    <div className="site-container inner-page friends-page">
      <PageHeading
        label="FRIENDS & CONNECTIONS"
        title="友情链接"
        description="学校、兄弟社团，以及协会伙伴的个人网站与项目。"
      />
      <FriendsLoop />
      <div className="friends-grid grid grid-cols-1 gap-6 sm:grid-cols-2 min-[1021px]:grid-cols-3">
        {content.friends.map((friend) => (
          <a
            key={friend.title}
            className="friend-card"
            href={friend.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="friend-icon">
              <FriendAvatar src={friend.image} name={friend.title} />
            </div>
            <ArrowUpRight className="friend-arrow" size={20} />
            <h2>{friend.title}</h2>
            <p>{friend.description}</p>
            <span className="friend-domain">{new URL(friend.href).hostname}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  const { reduced } = useSiteMotion();
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyQQ = async () => {
    try {
      await navigator.clipboard.writeText(site.qq);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <div className="site-container inner-page contact-page">
      <PageHeading
        label="SAY HELLO TO YOUR NEXT CHAPTER"
        title="联系我们"
        description="咨询加入方式、课程安排、技术问题或活动合作，欢迎通过以下方式联系。"
      />
      <div className="contact-layout grid grid-cols-1 gap-7 min-[801px]:grid-cols-2 lg:gap-12">
        <section className="contact-main">
          <div className="eyebrow">
            <span className="status-dot" />
            <ShinyLabel text="招新交流 / HELLO, JXUFE" />
          </div>
          <MessageCircle className="contact-icon" size={40} />
          <h2>加入招新交流群</h2>
          <p>加入招新交流 QQ 群，了解部门、活动和加入方式。也欢迎带着技术问题来交流。</p>
          <div className="qq-block">
            <div>
              <small>招新交流 QQ 群</small>
              <strong>{site.qq}</strong>
            </div>
            <ActionButton className="copy-button" onClick={copyQQ} aria-label="复制 QQ 群号">
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? '已复制' : '复制群号'}
            </ActionButton>
          </div>
          <p className="copy-status" role="status">
            {copyError
              ? `暂时无法自动复制，请手动复制群号：${site.qq}`
              : copied
                ? '群号已复制，打开 QQ 搜索群号即可。'
                : '在 QQ 中搜索群号，申请加入交流。'}
          </p>
        </section>
        <div className="contact-information">
          <section>
            <Mail size={22} />
            <div>
              <span>写一封邮件</span>
              <a href={`mailto:${site.email}`}>
                {site.email}
                <ArrowUpRight size={16} />
              </a>
              <p>活动合作、技术交流或其他问题，欢迎联系。</p>
            </div>
          </section>
          <section>
            <MapPin size={22} />
            <div>
              <span>在校园找到我们</span>
              <h3>江西财经大学 · 麦庐园校区</h3>
              <p>
                计算机与人工智能学院
                <br />
                日常活动地点：例会授课教室
                <br />
                具体时间和教室请通过交流群咨询。
              </p>
            </div>
          </section>
          <section>
            <GraduationCap size={22} />
            <div>
              <span>协会指导老师</span>
              <h3>{site.teacher}</h3>
              <p>普及计算机知识，提高计算机应用水平，培养计算机专业人才。</p>
            </div>
          </section>
        </div>
      </div>
      <section className="faq-section">
        <div>
          <div className="eyebrow">加入之前</div>
          <h2>常见问题</h2>
        </div>
        <Accordion type="single" collapsible className="faq-list">
          {[
            {
              q: '没有计算机基础，也可以加入吗？',
              a: '当然可以。协会面向全校计算机爱好者，不限专业，也不要求已有技术基础。可以从新生课程和自己感兴趣的例会开始。',
            },
            {
              q: '必须只参加自己部门的课程吗？',
              a: '不用。计算机协会各部门没有明确的学习界限，每周例会允许所有部门的社员参加，大家可以选择感兴趣的知识学习。',
            },
            {
              q: '平时会有哪些活动？',
              a: '有每周例会授课、PC卫士进校园、期末学科辅导、新生编程语法培训、电子扫盲课和赛前答疑。具体安排请在交流群中了解。',
            },
            {
              q: '如何了解具体招新安排？',
              a: `请加入招新交流 QQ 群 ${site.qq}，或发邮件至 ${site.email}，咨询报名时间、方式与部门情况。`,
            },
          ].map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="py-6 text-base font-medium">{item.q}</AccordionTrigger>
              <AccordionContent
                className="pb-6 text-base leading-8"
                transition={{ duration: reduced ? 0 : 0.25 }}
              >
                <p>{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
