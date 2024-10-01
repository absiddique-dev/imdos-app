import {
  ENDPOINT,
  generateServerAuthKey,
  generateServerSignature,
} from './secure';

const imdos = {
  async request(query, params = [], options) {
    const apiRequest = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-TOKEN': await generateServerSignature(),
        'X-AUTH-KEY': await generateServerAuthKey(),
      },
      body: JSON.stringify({
        query: query,
        params: params,
      }),
    });

    const response = await apiRequest.json();

    if (options?.first) {
      return response?.[0];
    }
    return response;
  },
  htmlDecode(value) {
    if (typeof value === 'string') {
      return value
        .replace(/&#(\d+);/g, function (match, dec) {
          return String.fromCharCode(dec);
        })
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/&#58;/g, ':')
        .replace(/&#59;/g, ';');
    } else {
      return value;
    }
  },
  extractYoutubeVideoId(url) {
    const regex = /youtu\.be\/([^/]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  },
  timeAgo(created_at) {
    const now = new Date();
    const createdDate = new Date(created_at);
    const diffInSeconds = Math.floor((now - createdDate) / 1000);

    const units = [
      {name: 'year', seconds: 31536000},
      {name: 'month', seconds: 2592000},
      {name: 'week', seconds: 604800},
      {name: 'day', seconds: 86400},
      {name: 'hour', seconds: 3600},
      {name: 'minute', seconds: 60},
      {name: 'second', seconds: 1},
    ];

    for (let unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return interval === 1
          ? `${interval} ${unit.name} ago`
          : `${interval} ${unit.name}s ago`;
      }
    }

    return 'just now';
  },
};

export default imdos;
