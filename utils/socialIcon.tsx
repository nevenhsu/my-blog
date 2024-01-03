import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
  FaWeixin,
  FaTelegram,
  FaLinkedin,
} from 'react-icons/fa6'
import { BsLine } from 'react-icons/bs'
import type { IconBaseProps } from 'react-icons'

export enum SocialIcon {
  Facebook = 'facebook',
  Instagram = 'instagram',
  Line = 'line',
  Linkedin = 'linkedin',
  Telegram = 'telegram',
  Whatsapp = 'whatsapp',
  WeChat = 'wechat',
  X = 'x',
}

export function getIcon(icon?: string, props?: IconBaseProps) {
  switch (icon) {
    case SocialIcon.Facebook:
      return <FaFacebook {...props} />
    case SocialIcon.X:
      return <FaXTwitter />
    case SocialIcon.Instagram:
      return <FaInstagram {...props} />
    case SocialIcon.Whatsapp:
      return <FaWhatsapp {...props} />
    case SocialIcon.WeChat:
      return <FaWeixin {...props} />
    case SocialIcon.Telegram:
      return <FaTelegram {...props} />
    case SocialIcon.Line:
      return <BsLine {...props} />
    case SocialIcon.Linkedin:
      return <FaLinkedin {...props} />
    default:
      return null
  }
}

export function getName(icon?: string) {
  switch (icon) {
    case SocialIcon.Facebook:
      return 'Facebook'
    case SocialIcon.X:
      return 'X'
    case SocialIcon.Instagram:
      return 'Instagram'
    case SocialIcon.Whatsapp:
      return 'WhatsApp'
    case SocialIcon.WeChat:
      return 'WeChat'
    case SocialIcon.Telegram:
      return 'Telegram'
    case SocialIcon.Line:
      return 'LINE'
    case SocialIcon.Linkedin:
      return 'LinkedIn'
    default:
      return null
  }
}
