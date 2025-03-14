import {CSSProperties, FC} from 'react';

interface CSSProp {
  [key: string]: CSSProperties
}

const styles: CSSProp = {
  footer: {
    textAlign: 'center',
    padding: '16px',
    background: '#f0f2f5',
    position: 'absolute', // ✅ Luôn ở dưới
    bottom: 0,
    width: '100%',
  },
};

const CustomFooter: FC = () => {
  return (
    <div style={styles.footer}>
      © {new Date().getFullYear()} MyCompany - All rights reserved.
    </div>
  );
};


export default CustomFooter;
