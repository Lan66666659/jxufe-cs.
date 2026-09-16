import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ActionButton, PhotoTilt } from './motion';
import content from '../data/site';

const photos = [content.activities[1], content.activities[0], content.activities[2]];

export default function ActivityShowcase() {
  const [current, setCurrent] = useState(0);
  const reduced = useReducedMotion();
  const activity = photos[current];
  return (
    <div className="activity-showcase">
      <div className="photo-outline" aria-hidden="true" />
      <PhotoTilt className="showcase-tilt">
        <div className="showcase-photo">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={activity.id}
              src={activity.image}
              alt={activity.title}
              width="680"
              height="520"
              initial={{ opacity: 0, scale: reduced ? 1 : 1.035 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
            />
          </AnimatePresence>
          <div className="photo-caption">
            <span>计协活动记录</span>
            <Link to={`/activities#activity-${activity.id}`}>
              <h2>{activity.title}</h2>
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </PhotoTilt>
      <div className="showcase-controls">
        <div className="photo-pagination" aria-label="选择活动照片">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              aria-label={`查看${photo.title}照片`}
              aria-pressed={current === index}
              onClick={() => setCurrent(index)}
              className={current === index ? 'selected' : ''}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <span>从课堂到校园</span>
        <div className="photo-arrows">
          <ActionButton
            className="icon-button"
            aria-label="上一张活动照片"
            onClick={() => setCurrent((current + photos.length - 1) % photos.length)}
          >
            <ArrowLeft size={18} />
          </ActionButton>
          <ActionButton
            className="icon-button"
            aria-label="下一张活动照片"
            onClick={() => setCurrent((current + 1) % photos.length)}
          >
            <ArrowRight size={18} />
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
