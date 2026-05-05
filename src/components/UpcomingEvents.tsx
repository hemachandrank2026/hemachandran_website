'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Calendar, CalendarDays, MapPin, ArrowRight, X, ExternalLink } from 'lucide-react';
import styles from './UpcomingEvents.module.css';

interface EventItem {
  _id: string;
  title: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

export default function UpcomingEvents({ events }: { events: EventItem[] }) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const hasEvents = events && events.length > 0;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateRange = (start: string, end?: string) => {
    const startFormatted = formatDate(start);
    if (!end || start === end) return startFormatted;
    const endFormatted = formatDate(end);
    return `${startFormatted} – ${endFormatted}`;
  };

  const getMonthShort = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  };

  const getDay = (dateStr: string) => {
    return new Date(dateStr).getDate();
  };

  return (
    <>
      <section className={`section ${styles.eventsSection}`} id="upcoming-events">
        <div className="container">
          <h2 className="section-title text-center" style={{ marginBottom: 16 }}>
            Upcoming <span className="accent-text">Events</span>
          </h2>
          <p className="section-subtitle text-center mx-auto" style={{ marginBottom: 48 }}>
            Conferences, summits and workshops where you can connect with me.
          </p>

          {hasEvents ? (
            <div className={styles.eventsTimeline}>
              {events.map((event, index) => (
                <div
                  key={event._id}
                  className={`${styles.eventCard} ${event.imageUrl ? styles.eventCardWithImage : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Event Image Thumbnail */}
                  {event.imageUrl && (
                    <div className={styles.eventImageThumb}>
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        sizes="120px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  {/* Date badge */}
                  <div className={styles.dateBadge}>
                    <span className={styles.dateMonth}>{getMonthShort(event.startDate)}</span>
                    <span className={styles.dateDay}>{getDay(event.startDate)}</span>
                  </div>

                  {/* Content */}
                  <div className={styles.eventContent}>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <div className={styles.eventMeta}>
                      <span className={styles.metaItem}>
                        <Calendar size={14} />
                        {formatDateRange(event.startDate, event.endDate)}
                      </span>
                      {event.location && (
                        <span className={styles.metaItem}>
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      )}
                    </div>
                    {event.description && (
                      <p className={styles.eventDesc}>
                        {event.description.length > 120
                          ? event.description.substring(0, 120) + '...'
                          : event.description}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={styles.eventArrow}>
                    <ArrowRight size={20} />
                  </div>

                  {/* Glow line */}
                  <div className={styles.glowLine} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <CalendarDays size={48} />
              <p>No upcoming events scheduled at the moment.</p>
              <span>Check back soon for new conferences, summits, and workshops.</span>
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Popup */}
      {selectedEvent && (
        <div className={styles.modalOverlay} onClick={() => setSelectedEvent(null)}>
          <div className={`${styles.modal} ${selectedEvent.imageUrl ? styles.modalLandscape : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedEvent(null)}>
              <X size={20} />
            </button>

            {/* Left: Image Panel */}
            {selectedEvent.imageUrl && (
              <div className={styles.modalImagePanel}>
                <Image
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}

            {/* Right: Content Panel */}
            <div className={styles.modalContentPanel}>
              <div className={styles.modalDateBadge}>
                <span className={styles.dateMonth}>{getMonthShort(selectedEvent.startDate)}</span>
                <span className={styles.dateDay}>{getDay(selectedEvent.startDate)}</span>
              </div>

              <h3 className={styles.modalTitle}>{selectedEvent.title}</h3>

              <div className={styles.modalMeta}>
                <span className={styles.metaItem}>
                  <Calendar size={16} />
                  {formatDateRange(selectedEvent.startDate, selectedEvent.endDate)}
                </span>
                {selectedEvent.location && (
                  <span className={styles.metaItem}>
                    <MapPin size={16} />
                    {selectedEvent.location}
                  </span>
                )}
              </div>

              {selectedEvent.description && (
                <p className={styles.modalDesc}>{selectedEvent.description}</p>
              )}

              {selectedEvent.link && (
                <a
                  href={selectedEvent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-primary ${styles.modalLink}`}
                >
                  View Event <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
