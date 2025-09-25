'use client'
import type { FC } from 'react'
import classNames from '@/utils/classnames'

type LogoSiteProps = {
  className?: string
}

const LogoSite: FC<LogoSiteProps> = ({
  className,
}) => {
  return (
    <span
      className={classNames('text-lg font-bold text-primary-500', className)}
    >
      The bridge
    </span>
  )
}

export default LogoSite
