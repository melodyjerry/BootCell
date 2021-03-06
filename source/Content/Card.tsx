import { VNodeChildElement, createCell } from 'web-cell';
import classNames from 'classnames';
import { HTMLProps } from '../utility';

export interface CardProps extends HTMLProps {
    title: string;
    text?: string;
    image?: VNodeChildElement;
    direction?: 'horizontal' | 'vertical';
    defaultSlot?: VNodeChildElement[];
}

export function Card({
    className = '',
    title,
    text,
    image,
    direction = 'vertical',
    defaultSlot,
    ...rest
}: CardProps) {
    const vertical = direction === 'vertical',
        header =
            typeof image !== 'string' ? (
                image
            ) : (
                <img className="card-img-top" src={image} />
            ),
        body = (
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {text && <p className="card-text">{text}</p>}
                {defaultSlot}
            </div>
        );

    return (
        <div
            {...rest}
            className={classNames(
                'card',
                !vertical && 'justify-content-center',
                className
            )}
        >
            {vertical ? (
                [header, body]
            ) : (
                <div className="row no-gutters align-items-center">
                    <div className="col-sm-4">{header}</div>
                    <div className="col-sm-8">{body}</div>
                </div>
            )}
        </div>
    );
}
