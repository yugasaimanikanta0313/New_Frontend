import React from 'react';
import UserNavbar from './UserNavbar';
import 'css-doodle';

function UserHome() {
    return (
        <div style={styles.page}>
            {/* Add css-doodle as a background effect */}
            <css-doodle>
                <style>
                    {`
                    --color: #51eaea, #fffde1, #ff9d76, #FB3569;

                    @grid: 30x1 / 100vw 100vh / #270f34; 

                    :container {
                        perspective: 30vmin;
                        --deg: @p(-180deg, 180deg);
                    }

                    :after, :before {
                        content: '';
                        background: @p(--color); 
                        @place: @r(100%) @r(100%);
                        @size: @r(6px);
                        @shape: heart;
                    }

                    @place: center;
                    @size: 18vmin; 

                    box-shadow: @m2(0 0 50px @p(--color));
                    background: @m100(
                        radial-gradient(@p(--color) 50%, transparent 0) 
                        @r(-20%, 120%) @r(-20%, 100%) / 1px 1px
                        no-repeat
                    );

                    will-change: transform, opacity;
                    animation: scale-up 12s linear infinite;
                    animation-delay: calc(-12s / @I * @i);

                    @keyframes scale-up {
                        0%, 95.01%, 100% {
                            transform: translateZ(0) rotate(0);
                            opacity: 0;
                        }
                        10% { 
                            opacity: 1; 
                        }
                        95% {
                            transform: 
                            translateZ(35vmin) rotateZ(var(--deg));
                        }
                    }
                    `}
                </style>
            </css-doodle>
            <UserNavbar />
        </div>
    );
}

const styles = {
    page: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
    },
};

export default UserHome;
